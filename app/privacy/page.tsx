export const metadata = { title: 'Privacy Policy | Sauna Amore' };

export default function PrivacyPage() {
  return (
    <section className="max-w-3xl mx-auto px-6 pt-36 pb-24">
      <h1 className="font-display text-4xl text-pine-deep mb-8">Privacy Policy</h1>
      <div className="space-y-5 text-inksoft leading-relaxed text-[15px]">
        <p>
          Sauna Amore (Le Marche, Italia) tratta i dati personali forniti tramite i moduli di questo sito —
          nome, email, telefono e indirizzo — esclusivamente per rispondere alle richieste di preventivo e
          di contatto. I dati non vengono venduti né condivisi con terze parti per finalità di marketing.
        </p>
        <p>
          I dati sono conservati per il tempo necessario a gestire la richiesta e gli eventuali rapporti
          commerciali che ne derivano. Puoi richiederne in ogni momento l&apos;accesso, la rettifica o la
          cancellazione scrivendo a <a href="mailto:info@saunaamore.it" className="text-pine underline">info@saunaamore.it</a>.
        </p>
        <p>
          Questo sito utilizza Vercel Analytics per statistiche di utilizzo anonime e aggregate; non vengono
          utilizzati cookie di profilazione.
        </p>
        <p>Titolare del trattamento: Sauna Amore — Le Marche, Italia — info@saunaamore.it</p>
      </div>
    </section>
  );
}
