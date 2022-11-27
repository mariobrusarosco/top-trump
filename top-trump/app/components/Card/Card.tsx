export function Card() {
    const hasImage = true

    return <div className="card p-2 lg:max-w-xs rounded-lg  shadow-md">
        <div className="bg-slate-100 rounded-t-lg">
            {hasImage 
                ? <img className=" h-48 w-full object-contain" src="https://assets.nintendo.com/image/upload/f_auto/q_auto/dpr_2.625/c_scale,w_400/ncom/pt_BR/games/switch/n/new-super-mario-bros-u-deluxe-switch/description-image" alt="Mario" />
                : <div className=" h-48 w-full card-image-placeholder"></div>
            }

        </div>
        <div className="bg-red-600 rounded-b-lg p-4">
            <ul>
                <li>
                    <span>speed</span>
                </li>
                <li>
                    <span>size</span>
                </li>
                <li>
                    <span>weight</span>
                </li>
                <li>
                    <span>magic</span>
                </li>
                <li>
                    <span>intelligence</span>
                </li>
            </ul>
        </div>
    </div>
}