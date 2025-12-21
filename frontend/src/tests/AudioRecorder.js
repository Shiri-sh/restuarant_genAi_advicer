import AudioRecorder from "../components/AudioRecorder";
import { render, screen, fireEvent } from "@testing-library/react";
import { sendAudioToServer } from "../services/api";

jest.mock("../services/api", () => ({
  sendAudioToServer: jest.fn()
}));

let mediaRecorderInstance;

beforeEach(() => {
  navigator.mediaDevices = {
    getUserMedia: jest.fn().mockResolvedValue({})
  };

  global.MediaRecorder = jest.fn(() => {
    mediaRecorderInstance = {
      start: jest.fn(),
      stop: jest.fn(),
      ondataavailable: null,
      onstop: null
    };
    return mediaRecorderInstance;
  });

  sendAudioToServer.mockResolvedValue([]);
});

test("does not send audio when cancel is clicked", async () => {
  render(<AudioRecorder onResult={jest.fn()} />);

  fireEvent.click(screen.getByTestId("mic-btn"));

  const cancelBtn = await screen.findByTestId("cancel-btn");
  fireEvent.click(cancelBtn);

  expect(sendAudioToServer).not.toHaveBeenCalled();
});

test("sends audio when confirm is clicked", async () => {
  render(<AudioRecorder onResult={jest.fn()} />);

  fireEvent.click(screen.getByTestId("mic-btn"));

  const confirmBtn = await screen.findByTestId("confirm-btn");

  mediaRecorderInstance.ondataavailable({
    data: new Blob(["audio"], { type: "audio/webm" })
  });

  fireEvent.click(confirmBtn);

  await mediaRecorderInstance.onstop();

  expect(sendAudioToServer).toHaveBeenCalledTimes(1);
});