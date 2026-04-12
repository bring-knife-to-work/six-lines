/**
 * 静态资源：源码中统一写 `@static/...`（相对项目根目录的 static 文件夹），
 * 运行期解析为小程序可用的 `/static/...`，避免各处手写路径不一致。
 */
export function resolveStatic(p) {
	if (!p || typeof p !== 'string') return ''
	const s = p.trim()
	if (s.startsWith('@static/')) {
		return '/' + s.replace(/^@static\//, 'static/')
	}
	if (s.startsWith('/static/')) return s
	if (s.startsWith('static/')) return '/' + s
	return s
}
