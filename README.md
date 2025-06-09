# invokey

A powerful Svelte library for handling keyboard shortcuts and sequences with ease.

## Features

- 🚀 **Easy to Use**: Bind key combinations to components with a single hook
- 🎯 **Component Support**: Display content when key combinations are matched
- 🎮 **Sequence Support**: Create complex keyboard sequences like Konami code
- ⚡ **Dynamic Control**: Enable/disable bindings during runtime
- 🎨 **TypeScript Support**: Full TypeScript support for better development experience

## Quick Start

```bash
npm install @invokey/svelte
```

### Basic Usage

```svelte
<script lang="ts">
	import { useCombination } from '@invokey/svelte';

	useCombination(['ctrl+k', 'meta+k'], (event, shortcut) => {
		console.log('Combination matched:', shortcut);
	});
</script>
```

### Component Usage

```svelte
<script lang="ts">
	import { Combination } from '@invokey/svelte';
</script>

<Combination combinations={['ctrl+a']}>Content shown when Ctrl+A is pressed</Combination>
```

### Sequence Support

```svelte
<script lang="ts">
	import { Sequence } from '@invokey/svelte';
</script>

<Sequence sequences="i>n>v>o>k>r">Content shown when sequence is entered</Sequence>
```

## Documentation

For detailed documentation, visit our [documentation site](https://bedis.elacheche.me/invokey) which includes:

- Installation guide
- Usage examples
- API reference
- Advanced features
- Best practices

## Contributing

We welcome contributions! Please check out our [GitHub repository](https://github.com/bedis-elacheche/invokey) for more information.

## License

MIT License - see the [LICENSE](LICENSE) file for details.
