import React from "react";

interface TemaProps {
  titleTema: string;
}

export default function Tema(props: TemaProps) {
  return (
    <div className="m-5">
      <h1 className="font-bold text-2xl">{props.titleTema}</h1>
    </div>
  );
}
