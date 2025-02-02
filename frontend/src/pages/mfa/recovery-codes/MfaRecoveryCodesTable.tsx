import { FC, ReactElement } from "react";

type MfaRecoveryCodesTableProps = {
  recoveryCodes: string[];
};

const MfaRecoveryCodesTable: FC<MfaRecoveryCodesTableProps> = ({
  recoveryCodes,
}) => {
  const renderCells = (): ReactElement[] => {
    const ret: ReactElement[] = [];

    for (let i = 0; i < recoveryCodes.length - 1; i++) {
      ret.push(
        <tr className="text-xs sm:text-sm md:text-lg font-semibold font-mono">
          <td align="left">{recoveryCodes[i]}</td>
          <td className="pl-10" align="left">
            {recoveryCodes[i + 1]}
          </td>
        </tr>,
      );
    }

    return ret;
  };
  return (
    <div className="mt-5 flex flex-row justify-center">
      <table className="table-auto">
        <tbody>{renderCells()}</tbody>
      </table>
    </div>
  );
};

export default MfaRecoveryCodesTable;
