import React, { useRef, useState } from "react";

const MfaVerifyTotp = () => {
  const curInputRef = useRef<HTMLInputElement>(null);
  const [totpCode, setTotpCode] = useState<string[]>(["", "", "", "", "", ""]);

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, idx: number) => {
    e.preventDefault();

    // User deleted input
    if (e.key === "Backspace") {
      totpCode[idx] = "";
      return;
    }

    // Input already populated OR User tried to input not a number
    if (totpCode[idx] || !Number.isInteger(Number.parseInt(e.key))) {
      return;
    }

    totpCode[idx] = e.key;
    setTotpCode(totpCode);
  };

  return (
    <div className="flex flex-row justify-center font-semibold text-slate-800">
      {totpCode.map((val, idx) => {
        if (!curInputRef.current && idx === 0) {
          return (
            <input
              ref={curInputRef}
              key={idx}
              className={`bg-slate-300 h-20 w-12 lg:w-16 text-center rounded-lg text-2xl ${idx !== 0 && "ml-2"}`}
              onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
                onKeyDown(e, idx)
              }
              type="text"
              defaultValue={val}
            />
          );
        } else {
          return (
            <input
              key={idx}
              className={`bg-slate-300 h-20 w-12 lg:w-16 text-center rounded-lg text-2xl ${idx !== 0 && "ml-2"}`}
              onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
                onKeyDown(e, idx)
              }
              type="text"
              defaultValue={val}
            />
          );
        }
      })}

      <input name="totp-code" value={totpCode.join("")} hidden readOnly />
    </div>
  );
};

export default MfaVerifyTotp;
