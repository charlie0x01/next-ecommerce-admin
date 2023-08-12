"use client";

import * as zod from "zod";
import { Store } from "@prisma/client";
import { Trash } from "../../../../../../node_modules/lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { useState } from "react";
import axios from "axios";
// local imports
import { useOrigin } from "@/hooks/use-origin";
import Heading from "@/components/heading";
import {
  FormField,
  Form,
  FormItem,
  FormControl,
  FormLabel,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { AlertModal } from "@/components/modals/alert-modal";
import { ApiAlert } from "@/components/api-alert";

interface SettingsFormProps {
  InitialStore: Store;
}

const formSchema = zod.object({
  name: zod.string().min(1),
});

type SettingsFromValues = zod.infer<typeof formSchema>;

const SettingsForm: React.FC<SettingsFormProps> = ({ InitialStore }) => {
  const params = useParams();
  const router = useRouter();

  const origin = useOrigin();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm({
    defaultValues: InitialStore,
    resolver: zodResolver(formSchema),
  });

  const handleOnSubmit = async (values: SettingsFromValues) => {
    console.log(values);
    try {
      setLoading(true);

      await axios.patch(`/api/stores/${params.storeId}`, values);
      router.refresh();

      toast.success("store updated");
    } catch (error) {
      toast.error("something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const handleOnConfirm = async () => {
    try {
      setLoading(true);

      await axios.delete(`/api/stores/${params.storeId}`);
      router.refresh();

      router.push("/");
      toast.success("Store deleted!");
    } catch (error) {
      toast.error("Please delete categories and other data related to this store!");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <AlertModal 
      title="Are you sure to delete this?" 
      description="This action is undoable." 
      isOpen={open}
      onClose={() => setOpen(false)}
      onConfirm={handleOnConfirm}
      loading={loading}
      />
      <div className="flex items-center justify-between">
        <Heading
          title="Settings"
          description="Change or update store details here"
        />
        <Button variant="destructive" size="sm" onClick={() => setOpen(true)}>
          <Trash className="h-4 w-4" />
        </Button>
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleOnSubmit)}
          className="space-y-8 w-full"
        >
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Store Name</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="Store name"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                );
              }}
            />
          </div>
          <Button type="submit" disabled={loading} className="ml-auto">
            Save Changes
          </Button>
        </form>
      </Form>
      <Separator />
      <ApiAlert 
        title="NEXT_PUBLIC_API_STORE"
        description={`${origin}/api/${params.storeId}`}
        variant="public"
      />
    </>
  );
};

export default SettingsForm;
