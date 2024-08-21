import {
  mockTelegramEnv,
  parseInitData,
  retrieveLaunchParams,
} from "@telegram-apps/sdk-react";

// It is important, to mock the environment only for development purposes. When building the
// application, import.meta.env.DEV will become false, and the code inside will be tree-shaken,
// so you will not see it in your final bundle.
if (import.meta.env.DEV) {
  let shouldMock: boolean;

  // Try to extract launch parameters to check if the current environment is Telegram-based.
  try {
    // If we are able to extract launch parameters, it means that we are already in the
    // Telegram environment. So, there is no need to mock it.
    retrieveLaunchParams();

    // We could previously mock the environment. In case we did, we should do it again. The reason
    // is the page could be reloaded, and we should apply mock again, because mocking also
    // enables modifying the window object.
    shouldMock = !!sessionStorage.getItem("____mocked");
  } catch (e) {
    shouldMock = true;
  }

  if (shouldMock) {
    const initDataRaw = new URLSearchParams([
      ["query_id", "AAGsT-gWAAAAAKxP6Bae_9eN"],
      [
        "user",
        JSON.stringify({
          id: 384323500,
          first_name: "Vladimr",
          last_name: "Ilyin",
          username: "wishyoudie",
          language_code: "en",
          is_premium: true,
          allows_write_to_pm: true,
        }),
      ],
      [
        "hash",
        "8858eb21aeac8f66e1d2a2d3cf51b472ee2a5efba6720be145c4c2cfcbd8ef86",
      ],
      ["auth_date", "1724174155"],
      ["start_param", ""],
      ["chat_type", "sender"],
      ["chat_instance", "8428209589180549439"],
    ]).toString();

    mockTelegramEnv({
      themeParams: {
        accentTextColor: "#007aff",
        bgColor: "#212121",
        buttonColor: "#2990ff",
        buttonTextColor: "#ffffff",
        destructiveTextColor: "#353935",
        headerBgColor: "#0f0f0f",
        hintColor: "#aaaaaa",
        linkColor: "#007aff",
        secondaryBgColor: "#0f0f0f",
        sectionBgColor: "#212121",
        sectionHeaderTextColor: "#aaaaaa",
        subtitleTextColor: "#aaaaaa",
        textColor: "#ffffff",
      },
      initData: parseInitData(initDataRaw),
      initDataRaw,
      version: "7.6",
      platform: "macos",
    });
    sessionStorage.setItem("____mocked", "1");

    console.info(
      "As long as the current environment was not considered as the Telegram-based one, it was mocked. Take a note, that you should not do it in production and current behavior is only specific to the development process. Environment mocking is also applied only in development mode. So, after building the application, you will not see this behavior and related warning, leading to crashing the application outside Telegram."
    );
  }
}
