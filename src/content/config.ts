import { defineCollection, reference, z } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      date: z.date(),
      description: z.string(),
      // image: image(), // Sin validación de tamaño
    //   image: image().refine((img) => img.width < 1200, {
    //     message: 'Image should be lower than 1200px',
    //   }),
    // En config.ts - ejemplo para el futuro

      image: image().refine((img) => {
        // Verificar que las propiedades existan antes de validar
        if (!img || typeof img.width !== 'number') {
          return true; // Si no puede leer las dimensiones, permite la imagen
        }
        return img.width <= 1200;
      }, {
        message: 'Image should be 1200px or lower',
      }),
    
      // // Relación
      // author: z.string(),
      author: reference('author'),
      // Relación
      tags: z.array(z.string()),

      // Boleano
      isDraft: z.boolean().default(false),
    }),
});

const authorCollection = defineCollection({
  type: 'data',
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      avatar: image(),
      twitter: z.string(),
      linkedIn: z.string(),
      github: z.string(),
      bio: z.string(),
      subtitle: z.string(),
    })
});

export const collections = {
  blog: blogCollection,
  author: authorCollection,
};