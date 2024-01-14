volatile unsigned char *video_memory = (unsigned char *)0xb8000;

void print_hello(const char *str){
  while(*str != '\0'){
    *video_memory = *str;
    ++video_memory = 0x07;
    ++video_memory;
    ++str;
  }
}

void kernel_main(){
  print_string("Hello World from a 🐧");
  while(1){}
}
