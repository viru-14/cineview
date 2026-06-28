interface ProgressBarProps {
    watched: number;
    total: number;
    percent: number;
    label?: string;
    showCounts?: boolean;
  }
  
  export const ProgressBar = ({
    watched,
    total,
    percent,
    label,
    showCounts = true,
  }: ProgressBarProps) => {
    return (
      <div className="w-full">
        {(label || showCounts) && (
          <div className="flex justify-between items-center mb-1.5 gap-4">
            {label && (
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {label}
              </span>
            )}
            {showCounts && (
              <span className="text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
                {watched} / {total} ({percent}%)
              </span>
            )}
          </div>
        )}
        <div
          className="h-2.5 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden"
          role="progressbar"
          aria-valuenow={percent}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={label ? `${label}: ${percent}%` : `${percent}%`}
        >
          <div
            className="h-full bg-green-500 rounded-full transition-all duration-300"
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>
    );
  };