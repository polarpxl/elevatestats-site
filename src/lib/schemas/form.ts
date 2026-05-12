import { z } from 'zod'

export const formSchema = z
  .object({
    name: z.string().trim().min(2, 'Please enter your name.'),
    email: z.email('Please enter a valid email address.'),
    subject: z.string().trim().optional().default(''),
    message: z.string().trim().min(10, 'Please write at least a sentence or two.'),
    website: z.string().optional().default(''),
    formType: z.enum(['contact', 'support']),
  })
  .superRefine((data, ctx) => {
    if (data.formType === 'support' && data.subject.trim().length < 3) {
      ctx.addIssue({
        code: 'custom',
        path: ['subject'],
        message: 'Please add a short subject (at least 3 characters).',
      })
    }
  })

export type FormInput = z.infer<typeof formSchema>
export type FormFieldErrors = Partial<Record<keyof FormInput, string[]>>
