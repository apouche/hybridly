import { getInternalRouterContext } from '../context'
import type { HybridRequestOptions } from '../router'
import { performHybridNavigation } from '../router'

export interface CloseDialogOptions extends HybridRequestOptions {
}

/**
 * Closes the dialog.
 */
export async function closeDialog(options?: CloseDialogOptions) {
	const context = getInternalRouterContext()
	const url = context.dialog?.redirectUrl ?? context.dialog?.baseUrl

	if (!url) {
		return
	}

	context.adapter.onDialogClose?.(context)

	return await performHybridNavigation({
		url,
		preserveScroll: true,
		preserveState: true,
		...options,
	})
}
