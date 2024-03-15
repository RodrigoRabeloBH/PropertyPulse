import Image from 'next/image'
import React from 'react'

export default function PropertyHeaderImage({ property }) {
    return (
        <section>
            <div className="container-xl m-auto">
                <div className="grid grid-cols-1">
                    <Image
                        src={property.images[0]}
                        alt={property.name}
                        className="object-cover h-[400px] w-full"
                        width={0}
                        height={0}
                        sizes='100vw'
                        priority={true}
                    />
                </div>
            </div>
        </section>
    )
}
