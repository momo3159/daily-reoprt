import React, { FC, useState, useEffect } from "react";

type Props = {
  date: string;
  text: string;
}

const Card: FC<Props> = ({date, text}) => {

  return (
    <div>
      <p>{date}</p>
      <p>{text}</p>
    </div>
  )
};

export default Card;
