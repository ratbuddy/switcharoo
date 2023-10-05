import React, { useState } from 'react';
import Slider, { createSliderWithTooltip, Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import { FilterValues } from '../types/filterTypes';
import '../styles/FilterComponent.css';

const TooltipSlider = createSliderWithTooltip(Slider);
const TooltipRange = createSliderWithTooltip(Range);

type Props = {
    data: any[];
    onApply: (filters: FilterValues) => void;
};

const FilterComponent: React.FC<Props> = ({ data, onApply }) => {
    const [nameSearch, setNameSearch] = useState('');
    const [manufacturer, setManufacturer] = useState<string | null>(null);
    const [type, setType] = useState<string | null>(null);
    const [pushFeel, setPushFeel] = useState<[number, number]>([1, 35]);
    const [wobble, setWobble] = useState<[number, number]>([1, 25]);
    const [sound, setSound] = useState<[number, number]>([1, 10]);
    const [context, setContext] = useState<[number, number]>([1, 20]);
    const [other, setOther] = useState<[number, number]>([1, 10]);
    const [total, setTotal] = useState<[number, number]>([1, 100]);

    const uniqueManufacturers = Array.from(new Set(data.map(item => item.Manufacturer)));
    const uniqueTypes = Array.from(new Set(data.map(item => item.Type)));

    const handleApply = () => {
        onApply({
            nameSearch,
            manufacturer,
            type,
            pushFeel,
            wobble,
            sound,
            context,
            other,
            total
        });
    };

    type SliderTooltipProps = {
        children: React.ReactNode;
    };

    const SliderTooltip: React.FC<SliderTooltipProps> = ({ children }) => (
        <div style={{
            position: 'absolute',
            bottom: '120%',
            left: '50%',
            transform: 'translateX(-50%)',
            padding: '4px 8px',
            borderRadius: '4px',
            backgroundColor: 'white',
            border: '1px solid #ccc',
            whiteSpace: 'nowrap'
        }}>
            {children}
        </div>
    );

    return (
        <div className="filter-container">
            <h2>Filters</h2>
            <div className="input-container">
                <label>
                    Switch Name:
                    <input className="text-input" value={nameSearch} onChange={(e) => setNameSearch(e.target.value)} />
                </label>
            </div>
            <div className="input-container">
                <label>
                    Manufacturer:
                    <select className="select-input" value={manufacturer || ''} onChange={(e) => setManufacturer(e.target.value)}>
                        <option value="">All</option>
                        {uniqueManufacturers.map(m => <option key={m} value={m}>{m}</option>)}
                    </select>
                </label>
                <label>
                    Type:
                    <select className="select-input" value={type || ''} onChange={(e) => setType(e.target.value)}>
                        <option value="">All</option>
                        {uniqueTypes.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                </label>
            </div>
            <div className="slider-container">
                <label>
                    Push Feel:
                    <TooltipRange
                        className="t-slider"
                        min={1}
                        max={35}
                        value={pushFeel}
                        onChange={(value: number[]) => setPushFeel(value as [number, number])}
                        tipFormatter={value => `${value}`}
                    />
                </label>
                <label>
                    Wobble:
                    <TooltipRange
                        className="t-slider"
                        min={1}
                        max={25}
                        value={wobble}
                        onChange={(value: number[]) => setWobble(value as [number, number])}
                        tipFormatter={value => `${value}`}
                    />
                </label>
                <label>
                    Sound:
                    <TooltipRange
                        className="t-slider"
                        min={1}
                        max={10}
                        value={sound}
                        onChange={(value: number[]) => setSound(value as [number, number])}
                        tipFormatter={value => `${value}`}
                    />
                </label>
                <label>
                    Context:
                    <TooltipRange
                        className="t-slider"
                        min={1}
                        max={20}
                        value={context}
                        onChange={(value: number[]) => setContext(value as [number, number])}
                        tipFormatter={value => `${value}`}
                    />
                </label>
                <label>
                    Other:
                    <TooltipRange
                        className="t-slider"
                        min={1}
                        max={10}
                        value={other}
                        onChange={(value: number[]) => setOther(value as [number, number])}
                        tipFormatter={value => `${value}`}
                    />
                </label>
                <label>
                    Total:
                    <TooltipRange
                        className="t-slider"
                        min={1}
                        max={100}
                        value={total}
                        onChange={(value: number[]) => setTotal(value as [number, number])}
                        tipFormatter={value => `${value}`}
                    />
                </label>
            </div>
            <button className="apply-button" onClick={handleApply}>Apply Filters</button>
        </div>
    );
};

export default FilterComponent;