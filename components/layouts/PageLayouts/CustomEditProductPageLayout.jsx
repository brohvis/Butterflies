import { useRouter } from 'next/dist/client/router';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authSelector } from '../../../store/feature/authSlice';
import { configsSelector } from '../../../store/feature/configsSlice';
import {
  currencies,
  listingCategories,
  myAccountListingDetails,
  storeSelector,
} from '../../../store/feature/storeSlice';
import CustomEditProductForm from '../../MyStore/EditProduct/CustomEditProductForm';
import EditProductForm from '../../MyStore/EditProduct/EditProductForm';
import EditSchedulePart from '../../MyStore/EditProduct/schedule/EditSchedulePart';
import EditVariantsPart from '../../MyStore/EditProduct/Variants/EditVariantsPart';

const CustomEditProductPageLayout = () => {
  const { auth_key } = useSelector(authSelector);
  const router = useRouter();
  const productId = router.query.product_id;

  const { listing_configs } = useSelector(storeSelector);
  const { genral_configs, marketplace_type, marketplace_module } =
    useSelector(configsSelector);

  const dispatch = useDispatch();
  useEffect(() => {
    if (auth_key) {
      dispatch(currencies({ authKey: auth_key }));
      dispatch(
        listingCategories({
          prams: { parent: 0, type: 'listings' },
          authKey: auth_key,
        })
      );
      dispatch(myAccountListingDetails({ id: productId, authKey: auth_key }));
    }
  }, [auth_key]);
  return (
    <div className="  w-full pt-2  pb-20 flex items-center c-lg:items-start  flex-col gap-8 md:gap-2   c-lg:flex-row justify-center">
      <div className="w-full  xs:w-[500px]  c-lg:w-[450px] xl:w-[500px]  2xl:w-[600px] ">
        <div className=" bg-white  w-full  p-5 shadow-c-sm rounded-lg">
          {listing_configs !== null && <CustomEditProductForm />}
        </div>
      </div>
    </div>
  );
};

export default CustomEditProductPageLayout;
