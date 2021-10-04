import { useEffect, useRef, useState } from "react";

type SVGType = SVGElement & HTMLElement;

interface Options {
	onCompleted: (name: string, element: SVGType) => void;
	onError: (err: Error) => void;
}

function useDynamicSVGImport(name: string, options?: Options) {
	const ImportedIconRef = useRef<SVGType>();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<Error>();

	useEffect(() => {
		setLoading(true);
		const importIcon = async () => {
			try {
				ImportedIconRef.current = (
					await import(`./${name}.svg`)
				).ReactComponent;
				if (options?.onCompleted && ImportedIconRef.current) {
					options.onCompleted(name, ImportedIconRef.current);
				}
			} catch (_e) {
				const e = _e as Error;
				if (options?.onError) {
					options.onError(e);
				}
				setError(e);
			} finally {
				setLoading(false);
			}
		};

		importIcon();
	}, [name, options?.onCompleted, options?.onError]);

	return { error, loading, SvgIcon: ImportedIconRef.current };
}

export { useDynamicSVGImport };
