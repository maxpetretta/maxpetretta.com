<script lang="ts">
type Props = {
  class?: string
}

const { class: className }: Props = $props()
</script>

<div class={className}>
  <iframe
    src="https://maxpetretta.substack.com/embed"
    width="100%"
    height="150"
    style="border:1px solid #EEE; background:white; border-radius: 8px;"
    frameborder="0"
    scrolling="no"
    title="Subscribe to my Substack"
  ></iframe>
</div>
