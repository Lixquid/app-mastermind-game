import { useState } from "preact/hooks";
import {
    GameSettings,
    GameState,
    newGameState,
    validateGameSettings,
} from "../lib/data";

/** Props for GameSetup component */
interface GameSetupProps {
    /** The game settings */
    settings: GameSettings;
    /** Function to update the game settings */
    setSettings: (settings: GameSettings) => void;
    /** Function to start the game */
    startGame: (gameState: GameState) => void;
}

export function GameSetup(props: GameSetupProps) {
    const [slots, setSlots] = useState(props.settings.slots);
    const [slotMax, setSlotMax] = useState(props.settings.slotMax);
    const [slotsUnique, setSlotsUnique] = useState(props.settings.slotsUnique);

    const validationErrors = validateGameSettings({
        slots,
        slotMax,
        slotsUnique,
    });

    return (
        <div class="card">
            <div class="card-header">Game Setup</div>
            <div class="card-body">
                <div class="row">
                    <div class="col-md mb-5">
                        <label class="form-label" for="code-length">
                            Code Length
                        </label>
                        <input
                            class={`form-control${
                                validationErrors.slots.length > 0
                                    ? " is-invalid"
                                    : ""
                            }`}
                            type="number"
                            id="code-length"
                            min="1"
                            max="10"
                            step="1"
                            value={slots}
                            onInput={(e) => {
                                setSlots(parseInt(e.currentTarget.value));
                            }}
                        />
                        <div class="form-text">
                            The number of slots in the code.
                        </div>
                        {validationErrors.slots.length > 0 && (
                            <div class="invalid-feedback">
                                {validationErrors.slots.join(" ")}
                            </div>
                        )}
                    </div>
                    <div class="col-md mb-5">
                        <label class="form-label" for="code-max">
                            Code Number Max
                        </label>
                        <input
                            class={`form-control${
                                validationErrors.slotMax.length > 0
                                    ? " is-invalid"
                                    : ""
                            }`}
                            type="number"
                            id="code-max"
                            min="2"
                            max="10"
                            step="1"
                            value={slotMax}
                            onInput={(e) => {
                                setSlotMax(parseInt(e.currentTarget.value));
                            }}
                        />
                        <div class="form-text">
                            The maximum number each slot in the code can be.
                        </div>
                        {validationErrors.slotMax.length > 0 && (
                            <div class="invalid-feedback">
                                {validationErrors.slotMax.join(" ")}
                            </div>
                        )}
                    </div>
                    <div class="col-md mb-5">
                        <label class="form-label" for="code-unique">
                            Code Slots Unique
                        </label>
                        <div class="col-form-label">
                            <div class="form-check form-switch">
                                <input
                                    class="form-check-input"
                                    type="checkbox"
                                    id="code-unique"
                                    checked={slotsUnique}
                                    onChange={(e) => {
                                        setSlotsUnique(e.currentTarget.checked);
                                    }}
                                />
                                <label
                                    class="form-check-label"
                                    for="code-unique"
                                >
                                    Unique
                                </label>
                            </div>
                        </div>
                        <div class="form-text">
                            Whether each slot in the code must be unique.
                        </div>
                    </div>
                </div>
                <div class="d-flex justify-content-end">
                    <button
                        class="btn btn-primary btn-lg"
                        onClick={() => {
                            props.setSettings({
                                slots,
                                slotMax,
                                slotsUnique,
                            });
                            props.startGame(
                                newGameState({
                                    slots,
                                    slotMax,
                                    slotsUnique,
                                })
                            );
                        }}
                        disabled={!validationErrors.valid}
                    >
                        <i class="bi bi-play-circle me-2"></i>
                        Start Game
                    </button>
                </div>
            </div>
        </div>
    );
}
