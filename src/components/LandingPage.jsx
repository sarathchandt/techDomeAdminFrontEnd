import { GrStar } from "@react-icons/all-files/gr/GrStar"
import { AiOutlineArrowRight } from "@react-icons/all-files/ai/AiOutlineArrowRight"

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';


function LandingPage() {

    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3,
            slidesToSlide: 3 // optional, default to 1.
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2,
            slidesToSlide: 2 // optional, default to 1.
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
            slidesToSlide: 1 // optional, default to 1.
        }
    };

    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12 md:px-20 md:my-3 relative">
                        <div className="brightness-50 ">
                            <img src="images/aot-3.jpg" className=" h-40 md:h-80 object-top inset-0 bg-black  object-none   w-full" alt="" />
                        </div>
                        <div className="absolute top-1/4 right-1/4 ">
                            <h1 className="text-white md:text-6xl font-semibold">ATTACK ON THE TITANS</h1>
                            <div className="text-yellow-400 flex justify-between  text-3xl md:text-7xl">
                                <GrStar />
                                <GrStar />
                                <GrStar />
                                <GrStar />
                                <GrStar />
                            </div>

                        </div>
                    </div>
                    <div className="col-12 md:px-20 font-mono">
                        <h1 className="font-semibold text-3xl flex space-x-2 mt-4 ">CHAPTER - 1</h1>
                        <div className=" flex mb-4 ">
                            <div className="w-1/12 h-1 bg-black"></div>
                            <div className="w-11/12 h-1 bg-black opacity-10"></div>
                        </div>
                        <div className="">
                            <p>Lorem ipsum dolor Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nobis, quo nostrum. Voluptatem nulla, saepe impedit autem itaque nam iure assumenda illum cum dicta possimus. Laudantium sed odio magni earum molestias! Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur ea esse quo sapiente laudantium nam quidem voluptas dolorem, fuga voluptate commodi, ipsa odio, perspiciatis tempora enim omnis animi non iure? Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit nam distinctio repudiandae adipisci cupiditate, minus earum pariatur quia vero natus itaque excepturi numquam quaerat nulla facilis culpa libero, porro provident. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia nisi nihil necessitatibus tempore nulla temporibus hic. Temporibus reprehenderit delectus voluptas perspiciatis animi numquam possimus atque. Debitis, culpa! Praesentium, maxime nesciunt. Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit, aspernatur eveniet. Perferendis, veritatis sed distinctio eum praesentium facere, ab sunt porro eius omnis at deleniti ullam odit adipisci placeat modi. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Totam similique tenetur eligendi, tempore labore numquam voluptate libero perspiciatis! Laboriosam pariatur aut magnam. Corporis quod ullam in iure! Sunt, delectus assumenda? Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident et esse ullam illo? Suscipit, explicabo natus odit laudantium beatae sit aliquam aspernatur molestias voluptatem? Impedit consequuntur natus assumenda. Esse, exercitationem! Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet voluptatem minima voluptas repellat sunt temporibus esse ipsa maiores! Odit voluptas, dolores cupiditate provident tenetur fugit. Mollitia excepturi minima praesentium quod. sit amet consectetur adipisicing elit. Id, excepturi totam mollitia et adipisci laboriosam aliquam est ex, atque ea officia iusto fugiat optio perspiciatis quas vero hic quo? Accusantium! Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit corrupti veritatis facilis fugiat. Optio fuga nam tempora quaerat recusandae quidem dolorum commodi facere voluptas incidunt delectus voluptatibus, nisi, doloremque pariatur. Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem numquam repellat dolor mollitia distinctio illum facere commodi explicabo cupiditate veniam assumenda recusandae animi ut, esse beatae, consequatur aspernatur! Illum, dolorum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates, molestiae quam. Iste modi et eos illo porro enim quis? Unde accusantium rerum saepe eligendi tempore sint iure excepturi placeat sapiente. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Perspiciatis nihil tenetur illum, nobis optio dolores esse facilis culpa, quo magnam est sequi ex blanditiis corrupti dolor excepturi ipsam sunt inventore? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt, culpa ratione? Aperiam exercitationem modi deleniti, dolore blanditiis hic quos vero qui inventore laudantium harum pariatur et nam ducimus tempore voluptatem! Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore natus sapiente molestias eum quam optio dolores voluptatibus sunt nam, ducimus, assumenda doloribus quo temporibus non doloremque culpa quae sequi nemo! Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores repellat ea error ullam! Qui aperiam nobis aut dignissimos ab quia. Maxime reiciendis in eos harum labore veniam similique ratione cumque?</p>
                            <div className="w-12/12 my-4 h-1 bg-black opacity-10"></div>
                            <div className="flex justify-end space-x-1 text-2xl">
                                <div className=" py-5">
                                    <AiOutlineArrowRight />
                                </div>
                                <div className=" py-5">
                                    <h1>CAPTER - 2</h1>
                                </div>
                            </div>
                        </div>
                    
                    {/* ........................................................ */}
                    <h1 className="font-semibold text-xl flex space-x-2 mt-4 ">Short Reads</h1>
                        <div className=" flex mb-4 ">
                            <div className="w-1/12 h-1 bg-black"></div>
                            <div className="w-11/12 h-1 bg-black opacity-10"></div>
                        </div>
                    <Carousel responsive={responsive} className="py-3">
                        <div> <div className="flex ">
                                <img src="images/naruto-11.jpg" className="w-56 h-32  object-center" alt="" />
                                <div className="">
                                    <h1 className="font-bold p-2">Akame Ga Kill: Season finale</h1>
                                    <div className="p-2">
                                    <p className="text-xs"> voluptatibus excepturi Asperiores repellat ea error e iusto eum doloremque!</p>
                                    </div>
                                </div>
                            </div></div>
                        <div> <div className="flex ">
                                <img src="images/naruto-11.jpg" className="w-56 h-32 object-center" alt="" />
                                <div className="">
                                    <h1 className="font-bold p-2">Akame Ga Kill: Season finale</h1>
                                    <div className="p-2">
                                    <p className="text-xs"> voluptatibus excepturi Asperiores repellat ea error e iusto eum doloremque!</p>
                                    </div>                              </div>
                            </div></div>
                        <div> <div className="flex ">
                                <img src="images/naruto-11.jpg" className="w-56 h-32 object-center" alt="" />
                                <div className="">
                                    <h1 className="font-bold p-2">Akame Ga Kill: Season finale</h1>
                                    <div className="p-2">
                                    <p className="text-xs"> voluptatibus excepturi Asperiores repellat ea error e iusto eum doloremque!</p>
                                    </div>                                </div>
                            </div></div>
                        <div> <div className="flex ">
                                <img src="images/naruto-11.jpg" className="w-56 h-32 object-center" alt="" />
                                <div className="">
                                    <h1 className="font-bold p-2">Akame Ga Kill: Season finale</h1>
                                    <div className="p-2">
                                    <p className="text-xs"> voluptatibus excepturi Asperiores repellat ea error e iusto eum doloremque!</p>
                                    </div>                             </div>
                            </div></div>
                       
                    </Carousel>

                    {/* ........................................................ */}
            </div>
                </div>
            </div>
        </>
    )
}

export default LandingPage