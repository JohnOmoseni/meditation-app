import { Image, View, FlatList, Pressable } from "react-native";
import { Link } from "expo-router";
import { GalleryPreviewDataType } from "@/constants/data";
import { CustomText } from "@/components/reuseables/themed-element/ThemedText";

interface GuidedAffirmationsGalleryProps {
	title: string;
	products: GalleryPreviewDataType[];
}

const GuidedAffirmationsGallery = ({
	title,
	products,
}: GuidedAffirmationsGalleryProps) => {
	return (
		<View className="my-5">
			<CustomText type="subtitle" className="mb-4">
				{title}
			</CustomText>

			<View className="space-y-2">
				<FlatList
					data={products}
					horizontal
					showsHorizontalScrollIndicator={false}
					keyExtractor={(item) => item.id.toString()}
					renderItem={({ item, index }) => (
						<Link key={index} href={`/affirmations/${item.id}`} asChild>
							<Pressable className="h-36 w-40 rounded-md mr-4 overflow-hidden">
								<Image
									source={item.image}
									resizeMode="cover"
									alt={title}
									className="w-full h-full"
								/>
							</Pressable>
						</Link>
					)}
				/>
			</View>
		</View>
	);
};

export default GuidedAffirmationsGallery;
