import type { PageProps } from "@/types";
import type { TChirp } from "@/types/models";

import { useForm, Head } from "@inertiajs/react";

import AuthenticatedLayout from "@/layouts/AuthenticatedLayout";
import InputError from "@/components/InputError";
import PrimaryButton from "@/components/PrimaryButton";
import Chirp from "@/components/Chirp";

export default function Index({ chirps }: PageProps<{ chirps: TChirp[] }>) {
    const { data, setData, post, processing, reset, errors } = useForm({
        message: "",
    });

    const submit = (e: any) => {
        e.preventDefault();
        post(route("chirps.store"), { onSuccess: () => reset() });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Chirps" />

            <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
                <form onSubmit={submit}>
                    <textarea
                        value={data.message}
                        placeholder="What's on your mind?"
                        className="block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                        onChange={e => setData("message", e.target.value)}
                    ></textarea>
                    <InputError message={errors.message} className="mt-2" />
                    <PrimaryButton className="mt-4" disabled={processing}>
                        Chirp
                    </PrimaryButton>
                </form>

                <div className="mt-6 bg-white shadow-sm rounded-lg divide-y">
                    {chirps.map(chirp => (
                        <Chirp key={chirp.id} chirp={chirp} />
                    ))}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
