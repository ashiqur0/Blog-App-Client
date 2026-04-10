import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { env } from '@/env';
import { revalidateTag, updateTag } from 'next/cache';
import { cookies } from 'next/headers';
import { toast } from 'sonner';

const CreateBlogFormServer = () => {

    const createBlog = async (formData: FormData) => {
        'use server';
        const title = formData.get('title') as string;
        const content = formData.get('content') as string;
        const tags = formData.get('tags') as string;

        const blogData = {
            title,
            content,
            tags: tags
                .split(',')
                .map(tag => tag.trim())
                .filter(tag => tag !== '')
        }

        const cookieStore = await cookies()

        const res = await fetch(`${env.API_URL}/posts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Cookie: cookieStore.toString()
            },
            body: JSON.stringify(blogData)
        });

        // console.log({ res })

        if (res.ok) {
            // revalidateTag('blogPosts', 'max');
            updateTag('blogPosts'); //either use one of them
        }
        // toast.success('Blog created successfully!');
    }

    return (
        <Card className='max-w-2xl mx-auto'>
            <CardHeader>
                <CardTitle>Create Blog</CardTitle>
                <CardDescription>You can write your blog here</CardDescription>
            </CardHeader>
            <CardContent>
                <form id='blog-form' action={createBlog}>
                    <FieldGroup>
                        <Field>
                            <FieldLabel>Title</FieldLabel>
                            <Input
                                type='txt'
                                name='title'
                            />
                        </Field>
                        <Field>
                            <FieldLabel>Content</FieldLabel>
                            <Textarea
                                id='content'
                                name='content'
                                placeholder='Write your blog'
                                required
                            />
                        </Field>
                        <Field>
                            <FieldLabel>Tags</FieldLabel>
                            <Input
                                type='txt'
                                name='tags'
                            />
                        </Field>
                    </FieldGroup>
                </form>
            </CardContent>
            <CardFooter>
                <Button form='blog-form' type='submit' className='w-full'>Submit</Button>
            </CardFooter>
        </Card>
    );
};

export default CreateBlogFormServer;