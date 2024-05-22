import { z } from 'zod'

export const userRoleSchema = z.object({
	id: z.number(),
	value: z.string(),
	label: z.string(),
})

export type UserRole = z.infer<typeof userRoleSchema>

export const userRoles: UserRole[] = [
	{
		id: 1,
		value: 'product-analyst',
		label: 'Product Analyst',
	},
	{
		id: 2,
		value: 'delivery-manager',
		label: 'Delivery Manager',
	},
	{
		id: 3,
		value: 'product-developer',
		label: 'Product Developer',
	},
	{
		id: 4,
		value: 'qa-engineer',
		label: 'QA Engineer',
	},
	{
		id: 5,
		value: 'cloud-architect',
		label: 'Cloud Architect',
	},
	{
		id: 6,
		value: 'ux-designer',
		label: 'UX Designer',
	},
	{
		id: 7,
		value: 'squad-lead',
		label: 'Squad Lead',
	},
	{
		id: 8,
		value: 'client-partnerships',
		label: 'Client Partnerships',
	},
	{
		id: 9,
		value: 'service-delivery',
		label: 'Service Delivery',
	},
	{
		id: 10,
		value: 'club-executive',
		label: 'Club Executive',
	},
	{
		id: 11,
		value: 'people-lead',
		label: 'People Lead',
	},
]
