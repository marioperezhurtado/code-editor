<script lang="ts">
    import { t } from "$lib/i18n/translations";
</script>

<div class="mx-auto mt-32 w-fit">
	<h2 class="mb-5 text-xl font-bold text-light">
		{$t('welcome.title')} <span class="text-accent">Code Editor</span>
	</h2>
	<ul class="flex flex-col gap-2">
		<li>
			<button>
			    {$t('welcome.actions.openFolder')}	
				<span class="text-sm text-light-2">(Ctrl + O)</span>
			</button>
		</li>
	</ul>
</div>
