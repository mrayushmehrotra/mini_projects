import mongoose from "mongoose";

export async function connection() {
  try {
    mongoose.connect(
      "mongodb+srv://ayushmehrotraisthedev:ayushmehrotraisthedev@cluster0.luggmsv.mongodb.net/learnnext",
    );
    const connection = mongoose.connection.on("connected", () => {
      console.log("Mongoose Connected");
    });
  } catch (e) {
    console.log(e);
  }
}
