import {
    FacebookShareButton,
    TwitterShareButton,
    WhatsappShareButton,
    EmailShareButton,
    PinterestShareButton,
    FacebookIcon,
    TwitterIcon,
    WhatsappIcon,
    EmailIcon,
    PinterestIcon
} from 'react-share';

export default function ShareButton({ property }) {
    const shareUrl = `${process.env.NEXT_PUBLIC_DOMAIN}/properties/${property._id}`;
    return (
        <>
            <h3 className='text-xl font-bold text-center pt-2'>
                Share this Property
            </h3>
            <div className='flex gap-3 justify-center pb-5'>
                <FacebookShareButton
                    url={shareUrl}
                    quote={property.name}
                    hashtag={`#${property.type.replace(/\s/g, '')}ForRent`}
                >
                    <FacebookIcon size={40} round={true} />
                </FacebookShareButton>

                <TwitterShareButton
                    url={shareUrl}
                    title={property.name}
                    hashtags={[`${property.type.replace(/\s/g, '')}ForRent`]}
                >
                    <TwitterIcon size={40} round={true} />
                </TwitterShareButton>

                <WhatsappShareButton
                    url={shareUrl}
                    title={property.name}
                    separator=':: '
                >
                    <WhatsappIcon size={40} round={true} />
                </WhatsappShareButton>

                <EmailShareButton
                    url={shareUrl}
                    subject={property.name}
                    body='Check out this property listing: '
                >
                    <EmailIcon size={40} round={true} />
                </EmailShareButton>        

                <PinterestShareButton
                    url={shareUrl}
                    media={property.images[0]}
                    description={[`${property.type.replace(/\s/g, '')}ForRent`]}
                >
                    <PinterestIcon size={40} round={true} />
                </PinterestShareButton>
            </div>
        </>
    )
}
