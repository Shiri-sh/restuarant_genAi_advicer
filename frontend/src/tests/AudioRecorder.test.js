import AudioRecorder from "../components/AudioRecorder";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { sendAudioToServer } from "../services/api";

jest.mock("../services/api", () => ({
  sendAudioToServer: jest.fn()
}));

// Mock AudioContext & Analyser
beforeAll(() => {
  class MockAnalyser {
    constructor() {
      this.fftSize = 512;
      this.smoothingTimeConstant = 0.7;
      this.frequencyBinCount = 512;
    }
    getByteFrequencyData(array) {
      array.fill(20); // ערך דיפולטיבי
    }
  }

  class MockAudioContext {
    createAnalyser() {
      return new MockAnalyser();
    }
    createMediaStreamSource() {
      return { connect: () => {} };
    }
    close() {
      return Promise.resolve();
    }
  }

  window.AudioContext = MockAudioContext;
  window.webkitAudioContext = MockAudioContext;
});

// Mock getUserMedia
global.navigator.mediaDevices = {
  getUserMedia: jest.fn().mockResolvedValue({
    getTracks: () => [{ stop: jest.fn() }]
  })
};

let mediaRecorderInstance;

beforeEach(() => {
  global.MediaRecorder = jest.fn(() => {
    mediaRecorderInstance = {
      start: jest.fn(),
      stop: jest.fn(),
      ondataavailable: null,
      onstop: null
    };
    return mediaRecorderInstance;
  });

  sendAudioToServer.mockResolvedValue({
    recommended_dishes: ["Dish1", "Dish2"]
  });
});

test("does not send audio when cancel is clicked", async () => {
  const mockNoRec = jest.fn();
  const mockRec = jest.fn();

  render(
    <AudioRecorder
      onResultRecommendations={mockRec}
      onResultNoRecommendations={mockNoRec}
    />
  );

  await act(async () => {
    fireEvent.click(screen.getByTestId("mic-btn"));
  });

  const cancelBtn = await screen.findByTestId("cancel-btn");

  await act(async () => {
    fireEvent.click(cancelBtn);
  });

  expect(sendAudioToServer).not.toHaveBeenCalled();
  expect(mockRec).not.toHaveBeenCalled();
  expect(mockNoRec).not.toHaveBeenCalled();
});

test("sends audio when confirm is clicked", async () => {
  const mockNoRec = jest.fn();
  const mockRec = jest.fn();

  render(
    <AudioRecorder
      onResultRecommendations={mockRec}
      onResultNoRecommendations={mockNoRec}
    />
  );

  await act(async () => {
    fireEvent.click(screen.getByTestId("mic-btn"));
  });

  const confirmBtn = await screen.findByTestId("confirm-btn");

  await act(async () => {
    // סימולציה של נתוני אודיו זמינים
    mediaRecorderInstance.ondataavailable({
      data: new Blob(["audio"], { type: "audio/webm" })
    });

    // לחיצה על כפתור אישור
    fireEvent.click(confirmBtn);

    // הפעלת onstop שמבצעת את הקריאה ל-sendAudioToServer
    await mediaRecorderInstance.onstop();
  });

  expect(sendAudioToServer).toHaveBeenCalledTimes(1);
  expect(mockRec).toHaveBeenCalledWith(["Dish1", "Dish2"]);
});
