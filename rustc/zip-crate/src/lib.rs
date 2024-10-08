extern crate wasm_bindgen;
extern crate zip;

mod utils;

use std::io::Cursor;
use wasm_bindgen::prelude::*;
use wasm_bindgen::JsValue;
use zip::ZipArchive;

//This function is called on the wasm module initialization
// When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
// allocator.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[wasm_bindgen(start)]
pub fn initialize() {
    utils::set_panic_hook();
}

#[wasm_bindgen]
pub struct ZipReader {
    zip: ZipArchive<Cursor<Vec<u8>>>,
}

// this is the main read functionality in the wasm
#[wasm_bindgen]
impl ZipReader {
    #[wasm_bindgen(constructor)]
    pub fn new(buf: Vec<u8>) -> ZipReader {
        let reader = Cursor::new(buf);
        let zip = ZipArchive::new(reader).unwrap();
        ZipReader { zip }
    }

    #[wasm_bindgen(js_name = getFilenameList)]
    pub fn get_filename_list(&mut self) -> Vec<JsValue> {
        let zip = &mut self.zip;
        let mut filename_list: Vec<String> = Vec::new();

        for idx in 0..zip.len() {
            let file = zip.by_index(idx).unwrap();
            let name = file.name().to_owned();
            if !name.ends_with("/") {
                filename_list.push(name);
            }
        }

        filename_list.iter().map(|x| JsValue::from_str(x)).collect()
    }

    #[wasm_bindgen(js_name = getBinary)]
    pub fn get_binary(&mut self, filename: &str) -> Vec<u8> {
        let zip = &mut self.zip;
        let mut file = zip.by_name(filename).unwrap();
        let mut buf = Vec::with_capacity(file.size() as usize);
        std::io::copy(&mut file, &mut buf).unwrap();
        buf
    }
}

//we will go into every folder until we find all the files in the zip
#[wasm_bindgen(js_name = getFilenameList)]
pub fn get_filename_list(buf: Vec<u8>) -> Vec<JsValue> {
    let reader = Cursor::new(buf);
    let mut zip = ZipArchive::new(reader).unwrap();
    let mut filename_list: Vec<String> = Vec::new();

    for idx in 0..zip.len() {
        let file = zip.by_index(idx).unwrap();
        let name = file.name().to_owned();
        if !name.ends_with("/") {
            filename_list.push(name);
        }
    }

    filename_list.iter().map(|x| JsValue::from_str(x)).collect()
}
