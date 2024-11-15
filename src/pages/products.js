// pages/about.js
import PhotoCard from "@/components/PhotoCard/PhotoCard";

export default function About() {
    const images = [
        'https://media.istockphoto.com/id/1352120492/vector/woman-blowing-bubble-with-a-pink-bubble-gum-and-pop-speech-bubble-pop-art-comic-vector.jpg?s=612x612&w=0&k=20&c=DM5h6PMf6_In3yZsluOeOTUzYLxXgyrfm_efgljaUv8=',
        'https://media.istockphoto.com/id/1352120492/vector/woman-blowing-bubble-with-a-pink-bubble-gum-and-pop-speech-bubble-pop-art-comic-vector.jpg?s=612x612&w=0&k=20&c=DM5h6PMf6_In3yZsluOeOTUzYLxXgyrfm_efgljaUv8=',
        'https://www.shutterstock.com/shutterstock/photos/679581043/display_1500/stock-vector-wow-pop-art-face-sexy-surprised-woman-with-pink-curly-hair-and-open-mouth-holding-sunglasses-in-679581043.jpg',
        'https://media.istockphoto.com/id/1352120492/vector/woman-blowing-bubble-with-a-pink-bubble-gum-and-pop-speech-bubble-pop-art-comic-vector.jpg?s=612x612&w=0&k=20&c=DM5h6PMf6_In3yZsluOeOTUzYLxXgyrfm_efgljaUv8=',
        'https://media.istockphoto.com/id/1352120492/vector/woman-blowing-bubble-with-a-pink-bubble-gum-and-pop-speech-bubble-pop-art-comic-vector.jpg?s=612x612&w=0&k=20&c=DM5h6PMf6_In3yZsluOeOTUzYLxXgyrfm_efgljaUv8=',
        'https://www.shutterstock.com/shutterstock/photos/679581043/display_1500/stock-vector-wow-pop-art-face-sexy-surprised-woman-with-pink-curly-hair-and-open-mouth-holding-sunglasses-in-679581043.jpg'
    ];

    return (
        <div>
            <h1>Photo Cards</h1>
            <div className="card-container">
                {images.map((src, index) => (
                    <PhotoCard key={index} imageSrc={src} />
                ))}
            </div>
            <style jsx>{`
                h1 {
                    text-align: center;
                    font-size: 24px;
                    margin-bottom: 24px;
                }

                .card-container {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr); /* Two columns */
                    gap: 24px; /* Spacing between cards */
                    padding: 16px;
                    max-width: 1200px;
                    margin: 0 auto;
                }

                @media (max-width: 768px) {
                    .card-container {
                        grid-template-columns: 1fr; /* Switch to one column on smaller screens */
                    }
                }
            `}</style>
        </div>
    );
}
