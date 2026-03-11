import React from "react";

type CopyBankGroupProps = {
  label: string;
  lines: string[];
};

const CopyBankGroup = ({ label, lines }: CopyBankGroupProps) => {
  return (
    <article className="border border-[#beb7a8]/18 bg-[#0b0d11]/62 p-4">
      <h3 className="text-[0.62rem] uppercase tracking-[0.2em] text-[#a8adb8]">
        {label}
      </h3>
      <ul className="mt-3 space-y-2">
        {lines.map((line) => (
          <li key={line} className="text-sm tracking-[0.04em] text-[#d1ccc3]">
            {line}
          </li>
        ))}
      </ul>
    </article>
  );
};

export default CopyBankGroup;
