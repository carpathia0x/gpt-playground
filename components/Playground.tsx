import Button from './Button';
import IconButton from './IconButton';
import SvgRegenerate from './icons/Regenerate';
import SvgShowHistory from './icons/ShowHistory';
import SvgUndoLast from './icons/UndoLast';
import Sidebar from './Sidebar';
import { useForm } from 'react-hook-form';
import { openai } from '@/utils/openai';
import { useState } from 'react';

export default function Playground() {
    const [prompt, setPrompt] = useState<string>('');
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    async function onSubmit() {
        const response = await openai.createCompletion({
            model: 'text-davinci-003',
            prompt,
            max_tokens: 256,
            temperature: 0,
        });
        setPrompt((prev) => prev + response.data.choices[0].text);
    }

    return (
        <div className="w-full bg-slate-50 grid grid-cols-5 2xl:grid-cols-10 gap-6 p-6 flex-1 dark:bg-slate-800">
            <form
                className="flex flex-col gap-3 col-span-4 2xl:col-span-9"
                onSubmit={handleSubmit(onSubmit)}
            >
                <textarea
                    className="border border-slate-200
                    dark:border-slate-700
                    dark:bg-slate-900
                    dark:text-white
                    rounded-sm flex-1 p-4
                    focus:outline-none
                    focus:placeholder-slate-300
                    "
                    placeholder="Write a tagline for an ice cream shop."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                />
                <div className="flex justify-between items-center">
                    <div className="flex gap-2 items-center">
                        <Button intent="primary" size="lg" type="submit">
                            Submit
                        </Button>
                        <IconButton intent="secondary" size="md">
                            <SvgRegenerate width={15} height={15} />
                        </IconButton>
                        <IconButton intent="secondary" size="md">
                            <SvgUndoLast width={15} height={15} />
                        </IconButton>
                        <IconButton intent="tertiary" size="md">
                            <SvgShowHistory width={15} height={15} />
                        </IconButton>
                    </div>
                </div>
            </form>

            <Sidebar />
        </div>
    );
}