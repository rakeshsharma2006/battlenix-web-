import Link from "next/link";

export function DeleteRequestSlot() {
  return (
    <div className="my-4 border-l-2 border-[#e5484d] pl-4">
      <p>
        Account deletion instructions are provided through the account-controlled support flow in the BattleNix app. Do not send passwords, OTPs, or other login secrets in a support request.
      </p>
      <p className="mt-3">
        <Link href="/contact" className="font-semibold text-white underline decoration-[#e5484d] underline-offset-4">
          View support options
        </Link>
      </p>
    </div>
  );
}
