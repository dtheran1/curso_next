'use server';
import { sql } from '@vercel/postgres';
//  Marcamos que todas las funciones se exportan en este archivo son de servidor y por lo tanto no se ejecutan ni se envian al cliente
import { Invoice } from './definitions';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const CreateInvoiceSchema = z.object({
  id: z.string(),
  customerId: z.string(),
  amount: z.coerce.number(),
  status: z.enum(['paid', 'pending']),
  date: z.string(),
});

const CreateInvoiceFormSchema = CreateInvoiceSchema.omit({
  id: true,
  date: true,
});
export async function createInvoice(formData: FormData) {
  const { customerId, amount, status } = CreateInvoiceFormSchema.parse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });

  // Transformamos para evitar errores de redondeo
  const amountInCents = amount * 100;

  // Creamos la fecha actual 2024-01-06
  const [date] = new Date().toISOString().split('T');

  await sql`
    INSERT INTO invoices (customer_id, amount, status, date)
    VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
  `;

  // Para traer los datos nuevamente y refrescar la tabla
  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');

  // Cuando son muchos los campos podemos obtener los valores asi:
  // const rawFormData = Object.fromEntries(formData.entries());
}
