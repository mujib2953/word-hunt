import React from "react";
import "./Definitions.css";

const Definitions = ({ language, word, meanings, lightMode }) => {
    return (
        <div className="meanings">
            {
                meanings[0] && word && language === 'en' && (
                    <div>
                        <audio
                            style={{
                                backgroundColor: lightMode ? '#000' : '#FFF',
                                borderRadius: '30px',
                                width: '100%'
                            }}
                            src={meanings[0].phonetics[0] && meanings[0].phonetics[0].audio}
                            controls
                        >
                            Your browser doesn't support audio element.
                        </audio>
                    </div>
                )
            }

            {
                word === "" ? (
                    <span className="subTitle">Start typing a word in Search</span>
                ) : (
                    meanings.map((mean) => (
                        mean.meanings.map((item) => (
                            item.definitions.map((def) => (
                                <div
                                    className="singleMean"
                                    style={{
                                        backgroundColor: lightMode ? '#3B5360' : "#FFF",
                                        color: lightMode ? '#FFF' : "#000"
                                    }}
                                >
                                    <b>{def.definition}</b>
                                    <hr
                                        style={{
                                            backgroundColor: "#000",
                                            width: "100%"
                                        }}
                                    />
                                    {
                                        def.example && (
                                            <span>
                                                <b>Example: </b> {def.example}
                                            </span>
                                        )
                                    }

                                    {
                                        def.synonyms && (
                                            <span>
                                                <b>Synonym: </b> {def.synonyms.map((s) => `${s}, `)}
                                            </span>
                                        )
                                    }

                                </div>
                            ))
                        ))
                    ))
                )
            }
        </div>
    );
};

export default Definitions;
