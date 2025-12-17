import { storage } from "../services/storage.js";
import path from "path";

describe("Multer Storage Configuration", () => {
  
  it("should set the correct destination path", () => {
    const cb = jest.fn();
    const req = {}; 
    const file = {}; 

    storage.getDestination(req, file, cb);

    const expectedPath = path.join(process.cwd(), "uploads");
    expect(cb).toHaveBeenCalledWith(null, expectedPath);
  });

  it("should set the correct filename", () => {
    const cb = jest.fn();
    const req = {};
    const file = { originalname: "my-audio-file.mp3" }; 
    
    storage.getFilename(req, file, cb);
    expect(cb).toHaveBeenCalledWith(null, file.originalname);
  });

});