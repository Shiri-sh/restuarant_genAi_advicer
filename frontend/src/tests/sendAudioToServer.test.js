import { sendAudioToServer } from "../services/api";

//גרסה-מזויפת-לFETCH
global.fetch = jest.fn();

describe("sendAudioToServer", () => {

  it("should send audio to server and return recommended dishes", async () => {

    //דימוי-תשובה-מהשרת
    const fakeResponse = {
      recommended_dishes: ["Pizza", "Pasta"]
    };

    //קריאה-לפטצ'-תחזיר-דימוי-של-ג'יסון
    fetch.mockResolvedValueOnce({
      json: async () => fakeResponse
    });

    // דימוי-בלוב
    const fakeBlob = new Blob(["audio"], { type: "audio/wav" });

    //מפעילי-את-הפונקציה-ע-הבלוב-במזויף
    const result = await sendAudioToServer(fakeBlob);

    //נקרא-פעם-אחת
    expect(fetch).toHaveBeenCalledTimes(1);
    //נבדוק-שהפונקציה-קוראת-ניתוב-הנכון-וכן-עם-פוסט-וששלחה-פורמט-דטה
    expect(fetch).toHaveBeenCalledWith(
      "http://localhost:5000/api/analyze-audio",
      expect.objectContaining({
        method: "POST",
        body: expect.any(FormData)
      })
    );
      //בדיקה-שהתוצאה-היא-מה-שהיה-בדימוי
    expect(result.recommended_dishes).toEqual(["Pizza", "Pasta"]);
  });

});
