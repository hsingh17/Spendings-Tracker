import { useState } from "react";
import { TOTP_KEY } from "./MfaVerify";

const MfaVerifyTotpInput = () => {
  const [totpCode, setTotpCode] = useState<string[]>(["", "", "", "", "", ""]);

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, idx: number) => {
    e.preventDefault();

    const isValid: boolean =
      e.key === "Backspace" || Number.isInteger(Number.parseInt(e.key));

    if (isValid) {
      const newTotpCode = [...totpCode];
      newTotpCode[idx] = e.key === "Backspace" ? "" : e.key;
      setTotpCode(newTotpCode);
    }
  };

  const autoTab = (e: React.KeyboardEvent<HTMLInputElement>, idx: number) => {
    // https://stackoverflow.com/q/66085763
    if (e.key === "Backspace" && idx !== 0) {
      // Tab back
      (e.currentTarget?.previousSibling as HTMLElement)?.focus();
    } else if (
      Number.isInteger(Number.parseInt(e.key)) &&
      idx !== totpCode.length - 1
    ) {
      // Tab forward
      (e.currentTarget?.nextSibling as HTMLElement)?.focus();
    }
  };

  return (
    <>
      <div className="flex flex-row justify-center font-semibold text-slate-800">
        {totpCode.map((val, idx) => (
          <input
            key={idx}
            className={`bg-slate-300 h-20 w-12 lg:w-16 text-center rounded-lg text-2xl ${idx !== 0 && "ml-2"}`}
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
              onKeyDown(e, idx)
            }
            type="text"
            onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) =>
              autoTab(e, idx)
            }
            defaultValue={val}
          />
        ))}

        <input name={TOTP_KEY} value={totpCode.join("")} hidden readOnly />
      </div>
    </>
  );
};

export default MfaVerifyTotpInput;
