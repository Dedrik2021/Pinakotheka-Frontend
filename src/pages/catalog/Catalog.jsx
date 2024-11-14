import { useParams, useLocation, useNavigate } from 'react-router';
import { useEffect, useState, useRef, useMemo, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BsGrid1X2 } from 'react-icons/bs';
import { CiFilter, CiGrid2H } from 'react-icons/ci';
import { Helmet } from 'react-helmet';
import PulseLoader from 'react-spinners/PulseLoader';

import { handleScroll, getPaginationItems } from '../../utils/helper';
import CategoriesList from '../../components/categories/categoriesList/CategoriesList';
import PaintingCard from '../../components/card/paintingCard/PaintingCard';
import PaintingColumnCard from '../../components/card/paintingColumnCard/PaintingColumnCard';
import Spinner from '../../components/spinner/Spinner';
import DropdownWithCheckboxes from '../../components/dropdownWithCheckboxes/DropdownWithCheckboxes';
import PriceFilter from '../../components/priceFilter/PriceFilter';
import {
	stylePaintingOptions,
	styleSculptureOptions,
	styleDrawingOptions,
	styleDigitalArtOptions,
	styleHandmadeFilterOptions,
} from '../../utils/filtersStyle';
import {
	paintingMaterialFilterOptions,
	sculptureMaterialFilterOptions,
	drawingMaterialFilterOptions,
	digitalArtMaterialFilterOptions,
	handmadeArtMaterialFilterOptions,
} from '../../utils/filterMaterial';
import {
	paintingSizeOptions,
	sculptureSizeOptions,
	drawingSizeOptions,
	digitalArtSizeOptions,
	handmadeArtSizeOptions,
} from '../../utils/filterSize';
import Pagination from '../../components/pagination/Pagination';
import {
	filterPaintingsByBtn,
	checkFilterPaintingsByDependencies,
	setStatus
} from '../../redux/slices/paintingSlice';

import './catalog.scss';

const gridBtns = [
	{ id: 1, icon: <BsGrid1X2 size={20} />, title: 'grid' },
	{ id: 2, icon: <CiGrid2H size={25} />, title: 'list' },
];

const Catalog = () => {
	const { slug } = useParams();
	const {
		filteredPaintings = [],
		status,
		statusFilter,
		filterByDependencies,
	} = useSelector((state) => state.painting);

	const [sortOption, setSortOption] = useState('price down');
	const [currentPage, setCurrentPage] = useState(1);
	const [activeGridBtn, setActiveGridBtn] = useState('grid');
	const [selectedOptions, setSelectedOptions] = useState([]);
	const [priceOptions, setPriceOptions] = useState({ min: 0, max: 10000 });
	const [loadingResultBtn, setLoadingResultBtn] = useState(false);
	const [loading, setLoading] = useState(false);
	const [disabledResultBtn, setDisabledResultBtn] = useState(true);
	const [styleOptions, setStyleOptions] = useState([]);
	const [materialOptions, setMaterialOptions] = useState([]);
	const [sizeOptions, setSizeOptions] = useState([]);
	const [angle, setAngle] = useState(90);

	const paintingsArray = Array.isArray(filteredPaintings) ? [...filteredPaintings] : [];

	const navigate = useNavigate();
	const location = useLocation();
	const dispatch = useDispatch();
	const searchParams = new URLSearchParams(location.search);
	let page = parseInt(searchParams.get('page')) || 1;
	let styleFilter = searchParams.get('style');
	let materialFilter = searchParams.get('material');
	let sizeFilter = searchParams.get('size');
	let gridBtn = searchParams.get('grid-btn');
	let priceMax = searchParams.get('price-max');
	let priceMin = searchParams.get('price-min');

	const filterStyle = styleFilter ? styleFilter.split('$').filter(Boolean) : [];
	const filterMaterial = materialFilter ? materialFilter.split('$').filter(Boolean) : [];
	const filterSize = sizeFilter ? sizeFilter.split('$').filter(Boolean) : [];
	const itemsRef = useRef();

	let optionsStyle = styleOptions.length
		? styleOptions.map((option) => option.value).join('$')
		: filterStyle?.map((option) => option).join('$');
	let optionsMaterial = materialOptions.length
		? materialOptions.map((option) => option.value).join('$')
		: filterMaterial?.map((option) => option).join('$');
	let optionsSize = sizeOptions.length
		? sizeOptions.map((option) => option.value).join('$')
		: filterSize?.map((option) => option).join('$');

	const saveLocalStorage = (gridBtnTitle = gridBtn ? gridBtn : 'grid') => {
		localStorage.setItem(
			'lastLocation',
			`${
				location.pathname
			}?page=${1}&style=${optionsStyle}&material=${optionsMaterial}&size=${optionsSize}&price-min=${
				priceOptions.min
			}&price-max=${priceOptions.max}&grid-btn=${gridBtnTitle}`,
		);
		navigate(
			`?page=${
				selectedOptions.length || !disabledResultBtn ? 1 : page
			}&style=${optionsStyle}&material=${optionsMaterial}&size=${optionsSize}&price-min=${
				priceOptions.min
			}&price-max=${priceOptions.max}&grid-btn=${gridBtnTitle}`,
		);
	};

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	useEffect(() => {
        const intervalId = setInterval(() => {
            setAngle(prevAngle => (prevAngle + 1) % 360);
        }, 100);

        return () => clearInterval(intervalId);
    }, []);

	const handleSubmit = async (e) => {
		if (e) e.preventDefault();
		setLoadingResultBtn(true);
		saveLocalStorage();
		await filterArts();
		handleScroll(itemsRef.current, currentPage, totalPages, 480);
		setLoadingResultBtn(false);
		setDisabledResultBtn(true);
	};

	useEffect(() => {
		const populateFiltersFromQuery = () => {
			if (filterStyle || filterMaterial || filterSize) {
				const styleOptionsFromQuery = filterStyle.map((option) => ({
					value: option,
					type: 'style',
				}));
				const materialOptionsFromQuery = filterMaterial.map((option) => ({
					value: option,
					type: 'material',
				}));
				const sizeOptionsFromQuery = filterSize.map((option) => ({
					value: option,
					type: 'size',
				}));

				setStyleOptions(styleOptionsFromQuery);
				setMaterialOptions(materialOptionsFromQuery);
				setSizeOptions(sizeOptionsFromQuery);

				setSelectedOptions([
					...styleOptionsFromQuery,
					...materialOptionsFromQuery,
					...sizeOptionsFromQuery,
				]);

				setActiveGridBtn(gridBtn ? gridBtn : 'grid');
				setPriceOptions({
					min: priceMin ? parseInt(priceMin) : 0,
					max: priceMax ? parseInt(priceMax) : 10000,
				});
			}
		};

		populateFiltersFromQuery();
	}, []);

	useEffect(() => {
		localStorage.setItem(
			'lastLocation',
			`${location.pathname}?page=${page}&style=${optionsStyle}&material=${optionsMaterial}&size=${optionsSize}&price-min=${priceOptions.min}&price-max=${priceOptions.max}&grid-btn=${gridBtn}`,
		);
	}, [
		optionsStyle,
		optionsMaterial,
		optionsSize,
		location.pathname,
		priceOptions.min,
		priceOptions.max,
		gridBtn,
		page,
	]);

	useEffect(() => {
		setSelectedOptions([...styleOptions, ...materialOptions, ...sizeOptions]);
	}, [styleOptions, materialOptions, sizeOptions]);

	useEffect(() => {
		const filterByDependencies = async () => {
			setLoadingResultBtn(true);
			await dispatch(
				checkFilterPaintingsByDependencies({
					dependenciesArray: selectedOptions,
					slug,
					price: priceOptions,
				}),
			);
			setTimeout(() => {
				setLoadingResultBtn(false);
			}, 300);
		};
		if (selectedOptions) {
			setDisabledResultBtn(false);
			filterByDependencies();
		}
	}, [dispatch, priceOptions, selectedOptions, slug]);

	const getArts = async () => {
		setLoading(true);
		await dispatch(filterPaintingsByBtn({ dependenciesArray: [], slug, sortOption }));
		setLoading(false);
	};

	useEffect(() => {
		getArts();
	}, [dispatch, slug]);

	useEffect(() => {
		if (!selectedOptions.length) {
			getArts();
		}
	}, [selectedOptions.length]);

	useEffect(() => {
		if (priceOptions.min === 0 && priceOptions.max === 10000) {
			getArts();
		}
	}, [priceOptions.min, priceOptions.max]);

	const filterArts = async () => {
		setLoading(true);
		await dispatch(
			filterPaintingsByBtn({
				dependenciesArray: selectedOptions,
				slug,
				price: priceOptions,
				sortOption,
			}),
		);
		setLoading(false);
	};

	useEffect(() => {
		if (sortOption) {
			filterArts();
		}
	}, [sortOption]);

	const {currentItems, totalPages} = getPaginationItems(12, paintingsArray, currentPage);

	const handlePageChange = (newPage) => {
		setLoading(true);
		setCurrentPage(newPage);
		handleScroll(itemsRef.current, currentPage, totalPages, 480);
		setTimeout(() => {
			setLoading(false);
		}, 300);
	};

	useEffect(() => {
		if (page) {
			setCurrentPage(page);
		}
	}, [page]);

	const getStyleFilterItems = () => {
		if (slug === 'paintings') return stylePaintingOptions;
		else if (slug === 'sculptures') return styleSculptureOptions;
		else if (slug === 'drawings') return styleDrawingOptions;
		else if (slug === 'digital-arts') return styleDigitalArtOptions;
		else if (slug === 'handmades') return styleHandmadeFilterOptions;
	};

	const getMaterialFilterItems = () => {
		if (slug === 'paintings') return paintingMaterialFilterOptions;
		else if (slug === 'sculptures') return sculptureMaterialFilterOptions;
		else if (slug === 'drawings') return drawingMaterialFilterOptions;
		else if (slug === 'digital-arts') return digitalArtMaterialFilterOptions;
		else if (slug === 'handmades') return handmadeArtMaterialFilterOptions;
	};

	const getSizeFilterItems = () => {
		if (slug === 'paintings') return paintingSizeOptions;
		else if (slug === 'sculptures') return sculptureSizeOptions;
		else if (slug === 'drawings') return drawingSizeOptions;
		else if (slug === 'digital-arts') return digitalArtSizeOptions;
		else if (slug === 'handmades') return handmadeArtSizeOptions;
	};

	const handlePriceChange = (min, max) => {
		setPriceOptions(min, max);
	};

	const handleActiveGridBtn = (title) => {
		setLoading(true);
		setActiveGridBtn(title);
		saveLocalStorage(title);
		setTimeout(() => {
			setLoading(false);
		}, 500);
	};

	const handleReset = async () => {
		setStyleOptions([]);
		setMaterialOptions([]);
		setSizeOptions([]);
		setPriceOptions({ min: 0, max: 10000 });

		localStorage.setItem('lastLocation', `${location.pathname}?page=${1}`);
		navigate(`?page=${1}`);
	};

	const handleSortChange = (event) => {
		const selectedOption = event.target.value;
		setSortOption(selectedOption);
		handleScroll(itemsRef.current, currentPage, totalPages, 480);
		localStorage.setItem(
			'lastLocation',
			`${
				location.pathname
			}?page=${1}&style=${optionsStyle}&material=${optionsMaterial}&size=${optionsSize}&price-min=${
				priceOptions.min
			}&price-max=${priceOptions.max}&grid-btn=${activeGridBtn}`,
		);
		navigate(
			`?page=${
				1
			}&style=${optionsStyle}&material=${optionsMaterial}&size=${optionsSize}&price-min=${
				priceOptions.min
			}&price-max=${priceOptions.max}&grid-btn=${activeGridBtn}`,
		);
		setDisabledResultBtn(true);
	};

	useMemo(() => {
		if (disabledResultBtn) {
			setLoading(true)
			setTimeout(async () => {
				await handleSubmit();
				setLoading(false);
			}, 0);
		}
	}, [disabledResultBtn]);

	if (!status || status === 'loading') return <Spinner />;

	return (
		<>
			<Helmet>
				<meta name={`Pinakotheka | Catalog: ${slug}`} />
				<title>Pinakotheka | Catalog: {slug}</title>
			</Helmet>
			<section className="catalog">
				<div className="container">
					<div className="catalog__inner" style={{background: `linear-gradient(${angle}deg, rgba(237, 238, 153, 1) 30%, rgba(34, 193, 195, 1) 100%`}} >
						<div className="catalog__categories">
							<CategoriesList />
						</div>
						<div className="catalog__filter-top">
							<h2 className="catalog__title title">{slug}</h2>
							<div className="catalog__grid-wrapper">
								<select
									className="catalog__select"
									value={sortOption}
									onChange={handleSortChange}
								>
									<option value="price down">Price down</option>
									<option value="price up">Price up</option>
									<option value="sale">Sale</option>
								</select>
								<ul className="catalog__grid-btns">
									{gridBtns.map((btn) => {
										return (
											<li
												key={btn.id}
												className={`catalog__grid-btns-items ${
													activeGridBtn === btn.title ? 'active' : ''
												}`}
											>
												<button
													onClick={() => handleActiveGridBtn(btn.title)}
													className="btn"
													type="button"
												>
													{btn.icon}
												</button>
											</li>
										);
									})}
								</ul>
							</div>
						</div>
						<div className="catalog__content">
							<div className="catalog__aside">
								<div className="catalog__filter">
									<div className="catalog__filter-icon">
										<CiFilter size={20} />
										<span className="catalog__filter-icon-title">Filter:</span>
										<span className="catalog__filter-icon-number">
											{(selectedOptions.length &&
												(priceOptions.min !== 0 ||
													priceOptions.max !== 10000)) ||
											(!selectedOptions.length &&
												(priceOptions.min !== 0 ||
													priceOptions.max !== 10000))
												? selectedOptions.length + 1
												: selectedOptions.length}
										</span>
									</div>
									<button
										disabled={
											selectedOptions.length ||
											priceOptions.min !== 0 ||
											priceOptions.max !== 10000
												? false
												: true
										}
										className={`btn btn--universal btn--black catalog__filter-reset `}
										onClick={handleReset}
									>
										Reset
									</button>
								</div>
								<form className="catalog__form" onSubmit={handleSubmit}>
									<DropdownWithCheckboxes
										title={'Style'}
										setSelectedOptions={setStyleOptions}
										selectedOptions={styleOptions}
										items={getStyleFilterItems()}
									/>
									<DropdownWithCheckboxes
										title={'Material'}
										setSelectedOptions={setMaterialOptions}
										selectedOptions={materialOptions}
										items={getMaterialFilterItems()}
									/>
									<DropdownWithCheckboxes
										title={'Size'}
										setSelectedOptions={setSizeOptions}
										selectedOptions={sizeOptions}
										items={getSizeFilterItems()}
									/>
									<div style={{ marginBottom: '20px' }}>
										<PriceFilter
											minPrice={0}
											maxPrice={10000}
											price={priceOptions}
											onPriceChange={handlePriceChange}
										/>
									</div>
									<button
										disabled={
											(!disabledResultBtn &&
												selectedOptions.length &&
												filterByDependencies?.length) ||
											(!disabledResultBtn &&
												filterByDependencies?.length &&
												(priceOptions.min !== parseInt(priceMin) ||
													priceOptions.max !== parseInt(priceMax)) &&
												(priceOptions.min !== 0 ||
													priceOptions.max !== 10000))
												? false
												: true
										}
										className={`btn btn--universal btn--black catalog__apply ${
											!disabledResultBtn &&
											filterByDependencies?.length &&
											(selectedOptions.length ||
												priceOptions.min !== 0 ||
												priceOptions.max !== 10000)
												? 'pulsing'
												: ''
										}`}
										type="submit"
									>
										{loadingResultBtn ? (
											<PulseLoader size={12} color="#fff" />
										) : selectedOptions.length ||
										  priceOptions.min !== 0 ||
										  priceOptions.max !== 10000 ? (
											`Found: ${filterByDependencies?.length}`
										) : (
											'Result'
										)}
									</button>
								</form>
							</div>
							<div className="catalog__cards" ref={itemsRef}>
								<ul
									className={`cards__list ${!currentItems.length ? 'row' : ''} ${
										activeGridBtn === 'grid' ? 'grid' : 'column'
									}`}
								>
									{currentItems?.length ? (
										currentItems.map((item) => {
											return activeGridBtn === 'grid' ? (
												<PaintingCard
													background="#ececec"
													status={statusFilter}
													loading={loading}
													{...item}
													key={item._id}
													slug={slug}
												/>
											) : (
												<PaintingColumnCard
													{...item}
													status={statusFilter}
													loading={loading}
													key={item._id}
													slug={slug}
												/>
											);
										})
									) : (
										<li className="cards__noresult">
											<h2>No Results</h2>
										</li>
									)}
								</ul>
								{currentItems.length ? (
									<Pagination
										totalPages={totalPages}
										handlePageChange={handlePageChange}
										currentPage={currentPage}
										styleOptions={optionsStyle}
										materialOptions={optionsMaterial}
										sizeOptions={optionsSize}
										gridBtn={activeGridBtn}
										priceMax={priceOptions.max}
										priceMin={priceOptions.min}
										filterByDependencies={filterByDependencies}
									/>
								) : null}
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default Catalog;
