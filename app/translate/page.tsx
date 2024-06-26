import { auth } from "@clerk/nextjs/server";

import { TranslationLanguages } from "@/types";
import { TranslationForm } from "@/components/translation-form";
import { TranslationHistory } from "@/components/translation-history";

const TranslatePage = async () => {
  auth().protect();

  const { userId } = auth();
  if (!userId) throw new Error("User not logged in");

  const languagesEndpoint =
    "https://api.cognitive.microsofttranslator.com/languages?api-version=3.0";

  const response = await fetch(languagesEndpoint, {
    next: {
      revalidate: 60 * 60 * 24,
    },
  });

  const languages = (await response.json()) as TranslationLanguages;

  return (
    <div className="px-10 xl:mb-20">
      <TranslationForm languages={languages} />

      <TranslationHistory />
    </div>
  );
};

export default TranslatePage;
