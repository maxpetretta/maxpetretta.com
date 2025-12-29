<script lang="ts">
type Props = {
  class?: string
}

const { class: className = "" }: Props = $props()
</script>

<div class={className}>
  <iframe
    src="https://maxpetretta.substack.com/embed"
    width="100%"
    height="150"
    style="border:1px solid hsl(var(--border)); background: hsl(var(--background)); border-radius: var(--radius);"
    frameborder="0"
    scrolling="no"
    title="Subscribe to my Substack newsletter"
  ></iframe>
</div>
