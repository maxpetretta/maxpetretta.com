<script lang="ts">
type Experience = {
  title: string
  start: string
  end: string
  href: string
}

const experiences: Experience[] = [
  { title: "Bracket, Cofounder & CTO", start: "2023", end: "Now", href: "https://bracket.game" },
  { title: "Worldcoin, Sr. Software Engineer", start: "2022", end: "2023", href: "https://worldcoin.org" },
  { title: "GEHC, Sr. Software Engineer", start: "2020", end: "2022", href: "https://gehealthcare.com" },
  { title: "GE, Software Engineer (DTLP)", start: "2018", end: "2020", href: "https://www.ge.com" },
]
</script>

<ul class="space-y-2 text-sm sm:text-base">
  {#each experiences as { title, start, end, href }}
    <li>
      <a
        {href}
        target="_blank"
        rel="noreferrer"
        class="clickable -mx-2 block rounded-sm px-2 py-1.5 hover:bg-accent hover:text-accent-foreground"
      >
        <div class="flex justify-between border-b border-dotted border-muted-foreground">
          <span>{title}</span>
          <span class="whitespace-nowrap text-left font-mono text-muted-foreground">{start} ~ {end}</span>
        </div>
      </a>
    </li>
  {/each}
</ul>
