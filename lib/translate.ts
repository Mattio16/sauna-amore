/**
 * DeepL-backed translation of product content (EN source → IT/NL/DE/RU).
 * Translations are stored on the record (Json `translations` column) so the
 * site never calls the API at render time.
 *
 * Requires DEEPL_API_KEY in the environment (free tier keys end in ":fx").
 * Without a key everything degrades gracefully to English.
 */

export const TARGET_LANGS = [
  { code: 'it', deepl: 'IT' },
  { code: 'nl', deepl: 'NL' },
  { code: 'de', deepl: 'DE' },
  { code: 'ru', deepl: 'RU' },
] as const;

export type TransFields = { name?: string; description?: string; specs?: string };
export type TransMap = Partial<Record<'it' | 'nl' | 'de' | 'ru', TransFields>>;

async function deepl(texts: string[], targetLang: string): Promise<string[] | null> {
  const key = process.env.DEEPL_API_KEY;
  if (!key || texts.length === 0) return null;
  const host = key.endsWith(':fx') ? 'https://api-free.deepl.com' : 'https://api.deepl.com';
  try {
    const res = await fetch(`${host}/v2/translate`, {
      method: 'POST',
      headers: {
        Authorization: `DeepL-Auth-Key ${key}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: texts, source_lang: 'EN', target_lang: targetLang }),
    });
    if (!res.ok) {
      console.warn(`DeepL ${targetLang} failed: ${res.status} ${await res.text()}`);
      return null;
    }
    const json = (await res.json()) as { translations: { text: string }[] };
    return json.translations.map((t) => t.text);
  } catch (e) {
    console.warn('DeepL request error:', e);
    return null;
  }
}

/**
 * Translate the given English fields into all target languages.
 * Returns null when no API key is configured or every request failed.
 */
export async function buildTranslations(fields: {
  name?: string | null;
  description?: string | null;
  specs?: string | null;
}): Promise<TransMap | null> {
  const keys = (['name', 'description', 'specs'] as const).filter((k) => fields[k]?.trim());
  if (keys.length === 0) return null;
  const texts = keys.map((k) => fields[k] as string);

  const out: TransMap = {};
  let any = false;
  for (const { code, deepl: dl } of TARGET_LANGS) {
    const translated = await deepl(texts, dl);
    if (!translated) continue;
    const entry: TransFields = {};
    keys.forEach((k, i) => {
      entry[k] = translated[i];
    });
    out[code] = entry;
    any = true;
  }
  return any ? out : null;
}

export function hasDeeplKey(): boolean {
  return !!process.env.DEEPL_API_KEY;
}
