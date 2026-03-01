'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export default function ContactPage() {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data: ContactFormValues) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log("Form submitted:", data);
    toast.success("Your message has been sent!");
    reset();
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center">
        <h1 className="text-5xl font-bold">Contact Us</h1>
        <p className="mx-auto mt-6 max-w-2xl text-xl text-muted-foreground">
          Have a question, a suggestion, or just want to say hi? Drop us a line.
        </p>
      </div>

      <div className="mx-auto mt-12 max-w-2xl">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <Input {...register("name")} placeholder="Your Name" />
            {errors.name && <p className="mt-2 text-sm text-red-500">{errors.name.message}</p>}
          </div>
          <div>
            <Input {...register("email")} placeholder="Your Email" />
            {errors.email && <p className="mt-2 text-sm text-red-500">{errors.email.message}</p>}
          </div>
          <div>
            <Textarea {...register("message")} placeholder="Your Message" rows={6} />
            {errors.message && <p className="mt-2 text-sm text-red-500">{errors.message.message}</p>}
          </div>
          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? "Sending..." : "Send Message"}
          </Button>
        </form>
      </div>
    </div>
  );
}
