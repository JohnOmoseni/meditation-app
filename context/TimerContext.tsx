import {
	Dispatch,
	ReactNode,
	SetStateAction,
	createContext,
	useContext,
	useState,
} from "react";

interface TimerContextProps {
	duration: number;
	setDuration: Dispatch<SetStateAction<number>>;
}

const TimerContext = createContext<TimerContextProps>({
	duration: 10,
	setDuration: () => {},
});

interface TimerProviderProps {
	children: ReactNode;
}

const TimerProvider = ({ children }: TimerProviderProps) => {
	const [duration, setDuration] = useState(10);

	return (
		<TimerContext.Provider value={{ duration, setDuration }}>
			{children}
		</TimerContext.Provider>
	);
};

export default TimerProvider;

export const useTimerContext = () => {
	const context = useContext(TimerContext);

	if (!context) {
		throw new Error("useTimerContext must be used within a TimerProvider");
	}

	return context;
};
