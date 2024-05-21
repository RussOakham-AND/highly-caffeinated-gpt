import { Control, FieldValues } from 'react-hook-form'
import { DevTool } from '@hookform/devtools'

const isDev = process.env.NODE_ENV === 'development'

interface RHCDevToolProps<TFieldValues extends FieldValues> {
	// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-arguments, @typescript-eslint/no-explicit-any
	control: Control<TFieldValues, any>
}

export const RHCDevTool = <TFieldValues extends FieldValues>({
	control,
}: RHCDevToolProps<TFieldValues>) => {
	if (!isDev) return null

	return <DevTool control={control} />
}
