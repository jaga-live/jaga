/* eslint-disable react/no-unescaped-entities */
export default function Code() {
  return (
    <div className="relative size-full">
      {/* <Rnd> */}
      <div className="p-2 pb-0 border dark:gradient-mask-b-0 gradient-mask-b-60 rounded-2xl border-black/10 bg-black/5 dark:border-white/10 dark:bg-white/5 ">
        <div className="relative overflow-hidden shadow-xl flex bg-white dark:bg-black    sm:max-h-[none] rounded-xl lg:h-[34.6875rem] xl:h-[31.625rem]  ring-1 ring-inset  ring-black/20 dark:ring-white/10 !h-auto max-h-[none]">
          <div className="relative flex flex-col w-full">
            <div className="flex-none border-b border-slate-500/30">
              <div className="flex items-center h-8 px-3 space-x-2">
                <div className="w-2.5 h-2.5 bg-red-500 rounded-full"></div>
                <div className="w-2.5 h-2.5 bg-yellow-300 rounded-full"></div>
                <div className="w-2.5 h-2.5 bg-emerald-300 rounded-full"></div>
              </div>
            </div>
            <div className="relative flex flex-col flex-auto min-h-0">
              <div className="flex flex-auto w-full min-h-0 overflow-auto">
                <div className="relative flex-auto w-full">
                  <pre className="flex min-h-full text-sm leading-6 xs:leading-3 xs:text-[10px] xxs:text-[8px]">
                    <div
                      aria-hidden="true"
                      className="flex-none block py-4 pr-4 text-right select-none text-slate-300 dark:text-slate-600"
                      style={{ width: "50px" }}
                    >
                      {Array.from({ length: 9 }, (_, i) => (
                        <div key={i}>{i + 1}</div>
                      ))}
                    </div>
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* </Rnd> */}
    </div>
  );
}
