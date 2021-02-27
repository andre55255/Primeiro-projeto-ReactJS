import React from 'react';

export default function Main(props) {
    return (
        <main className="conteudo p-4 d-flex justify-content-center">
            {props.children}
        </main>
    )
}