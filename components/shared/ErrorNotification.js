import { Roboto_Slab } from 'next/font/google';

const roboto_slab = Roboto_Slab({
    subsets: ['latin'],
    variable: '--font-roboto-slab',
    weight: ['400'],
});

const ErrorNotification = ({ message }) => {
    return (
        <div
            className={`absolute left-1/2 transform -translate-x-1/2 top-1/3 z-30 mx-auto flex w-auto items-center justify-center rounded-2xl bg-red-600 p-5 text-center transition-all`}>
            <div className={`text-white ${roboto_slab.variable} font-robotoSlab`}>
                {message ? message : 'Error'}
            </div>
        </div>
    );
};

export default ErrorNotification;
