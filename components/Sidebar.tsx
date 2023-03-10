import {
    bestOfAtom,
    frequencyPenaltyAtom,
    maxTokensAtom,
    restartTextAtom,
    startTextAtom,
    temperatureAtom,
    topPAtom,
} from '@/store';
import { useAtom } from 'jotai';
import ModelSelector from './ModelSelector';
import ModeSelector from './ModeSelector';
import RangeSlider from './RangeSlider';
import StopSequences from './StopSequences';

export default function Sidebar() {
    const [temperature, setTemperature] = useAtom(temperatureAtom);
    const [maxLen, setMaxLen] = useAtom(maxTokensAtom);
    const [startText, setStartText] = useAtom(startTextAtom);
    const [restartText, setRestartText] = useAtom(restartTextAtom);
    const [topP, setTopP] = useAtom(topPAtom);
    const [frequencyPenalty, setFrequencyPenalty] =
        useAtom(frequencyPenaltyAtom);
    const [bestOf, setBestOf] = useAtom(bestOfAtom);

    return (
        <div className=" flex-col gap-6 w-full hidden md:flex">
            <ModeSelector />
            <ModelSelector />
            <RangeSlider
                label="Temperature"
                defaultValue={0.7}
                value={temperature}
                setValue={setTemperature}
            />
            <RangeSlider
                value={maxLen}
                setValue={setMaxLen}
                label="Maximum length"
                min={1}
                max={4000}
                defaultValue={256}
                step={1}
            />
            <StopSequences />
            <RangeSlider
                label="Top P"
                defaultValue={0}
                max={2}
                value={topP}
                setValue={setTopP}
            />
            <RangeSlider
                label="Frequency penalty"
                defaultValue={0}
                max={2}
                value={frequencyPenalty}
                setValue={setFrequencyPenalty}
            />
            <RangeSlider
                label="Best of"
                min={1}
                max={20}
                step={1}
                defaultValue={1}
                value={bestOf}
                setValue={setBestOf}
            />
            {/* <InjectText
                type="start"
                injectValues={startText}
                setInjectValues={setStartText}
            />
            <InjectText
                type="restart"
                injectValues={restartText}
                setInjectValues={setRestartText}
            />
            <ShowProbabilities /> */}
        </div>
    );
}
