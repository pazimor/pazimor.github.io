interface Props {
  email: string;
}

export function ContactCTA({ email }: Props) {
  return (
    <section
      id="contact"
      className="flex items-center justify-between border-t border-border pt-8"
    >
      <div>
        <h2 className="mb-1 text-lg font-bold text-foreground">
          Une idée à discuter ?
        </h2>
        <p className="text-[13px] text-muted-foreground">
          Toujours ouvert à échanger sur un projet.
        </p>
      </div>
      <a
        href={`mailto:${email}`}
        className="shrink-0 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary/90"
      >
        Envoyer un email
      </a>
    </section>
  );
}
