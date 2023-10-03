import React, { useState } from 'react';
import ReactSlider from 'react-slider';
import { FilterValues } from '../types/filterTypes';
import '../styles/FilterComponent.css';

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

    interface ThumbProps {
        thumbProps: any; // this will contain all the properties related to the thumb component
        values: [number, number];
    }
    
    const Thumb: React.FC<ThumbProps> = ({ thumbProps, values }) => {
        const [value1, value2] = values;
    
        return (
            <>
                <span {...thumbProps} style={{ ...thumbProps.style, zIndex: 10 }}>
                    <div className="thumb-value">
                        {thumbProps.index === 0 ? value1 : value2}
                    </div>
                </span>
            </>
        );
    };

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
                    <ReactSlider
                        className="horizontal-slider"
                        thumbClassName="thumb"
                        trackClassName="track"
                        min={1}
                        max={35}
                        value={pushFeel}
                        renderThumb={(props) => <Thumb thumbProps={props} values={pushFeel} />}
                        onAfterChange={(value: number[] | number) => setPushFeel(value as [number, number])}
                    />
                </label>
                <label>
                    Wobble:
                    <ReactSlider
                        className="horizontal-slider"
                        thumbClassName="thumb"
                        trackClassName="track"
                        min={1}
                        max={25}
                        value={wobble}
                        renderThumb={(props) => <Thumb thumbProps={props} values={wobble} />}
                        onAfterChange={(value: number[] | number) => setWobble(value as [number, number])}
                    />
                </label>
                <label>
                    Sound:
                    <ReactSlider
                        className="horizontal-slider"
                        thumbClassName="thumb"
                        trackClassName="track"
                        min={1}
                        max={10}
                        value={sound}
                        renderThumb={(props) => <Thumb thumbProps={props} values={sound} />}
                        onAfterChange={(value: number[] | number) => setSound(value as [number, number])}
                    />
                </label>
                <label>
                    Context:
                    <ReactSlider
                        className="horizontal-slider"
                        thumbClassName="thumb"
                        trackClassName="track"
                        min={1}
                        max={20}
                        value={context}
                        renderThumb={(props) => <Thumb thumbProps={props} values={context} />}
                        onAfterChange={(value: number[] | number) => setContext(value as [number, number])}
                    />
                </label>
                <label>
                    Other:
                    <ReactSlider
                        className="horizontal-slider"
                        thumbClassName="thumb"
                        trackClassName="track"
                        min={1}
                        max={10}
                        value={other}
                        renderThumb={(props) => <Thumb thumbProps={props} values={other} />}
                        onAfterChange={(value: number[] | number) => setOther(value as [number, number])}
                    />
                </label>
                <label>
                    Total:
                    <ReactSlider
                        className="horizontal-slider"
                        thumbClassName="thumb"
                        trackClassName="track"
                        min={1}
                        max={100}
                        value={total}
                        renderThumb={(props) => <Thumb thumbProps={props} values={total} />}
                        onAfterChange={(value: number[] | number) => setTotal(value as [number, number])}
                    />
                </label>
            </div>
            <button className="apply-button" onClick={handleApply}>Apply Filters</button>
        </div>
    );
};

export default FilterComponent;
